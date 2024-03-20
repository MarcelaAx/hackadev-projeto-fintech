﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Troopers.Capibank.Domain.Enums;
using Troopers.Capibank.Domain.Models;
using Troopers.Capibank.DTOs.Request;
using Troopers.Capibank.DTOs.Response;
using Troopers.Capibank.Repositories;
using Troppers.Capibank.Data.Context;
using static System.Net.Mime.MediaTypeNames;

namespace Troopers.Capibank.Controllers;

public class TransacaoController : DefaultController
{
    private readonly CapibankContext _context;
    private readonly IMapper _mapper;

    public TransacaoController(CapibankContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }
    /// <summary>
    /// Método para retornar todas as transações do titular da conta, localizado pelo ID da conta.
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("listartransacoes/{id}")]
    public async Task<IEnumerable<Transacao>> ListarPorTitular(int id)
    {
        return  await _context.Transacoes.Where(c => c.ContaId == id).AsNoTracking().ToListAsync();
        
    }
    /// <summary>
    /// Método para realizar o depósito na conta localizada pelo ID da conta.
    /// </summary>
    /// <param name="depositoDTO"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpPost("depositar/{id}")]
    public async Task<IActionResult> Depositar(TransacaoDepositoDTO depositoDTO, int id)
    {
        var conta = await _context.ContasCorrente.Where(c => c.Id == id).FirstOrDefaultAsync();
        decimal valor = depositoDTO.Valor;
        if (conta == null)
            return NotFound("Conta não encontrada");
        if (valor <= 0)
            return BadRequest("Valor inválido");
        conta.Depositar(valor);
        conta.AlteradaEm = DateTime.Now;
        Transacao deposito = new()
        {
            ContaId = conta.Id,
            Valor = valor,
            TipoTransacao = Operacao.DEPOSITO,
            DataTransacao = depositoDTO.DataTransacao,
            Situacao = SituacaoTransacao.SUCEDIDA
        };
        await _context.Transacoes.AddAsync(deposito);
        await _context.SaveChangesAsync();
        return Ok("Deposito efetuado com sucesso");
    }
    /// <summary>
    /// Método para realizar o saque na conta localizada pelo ID da conta.
    /// </summary>
    /// <param name="saqueDTO"></param>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpPost("sacar/{id}")]
    public async Task<IActionResult> Sacar(TransacaoSaqueDTO saqueDTO, int id)
    {
        var conta = await _context.ContasCorrente.Where(c => c.Id == id).FirstOrDefaultAsync();
        decimal valor = saqueDTO.Valor;
        if (conta is null)
            return NotFound("Conta não encontrada");
        if (valor <= 0)
            return BadRequest("Valor inválido");
        conta.Sacar(valor);
        conta.AlteradaEm = saqueDTO.DataTransacao;
        Transacao saque = new()
        {
            ContaId = conta.Id,
            Valor = valor,
            TipoTransacao = Operacao.SAQUE,
            DataTransacao = saqueDTO.DataTransacao,
            Situacao = SituacaoTransacao.SUCEDIDA
        };
        await _context.Transacoes.AddAsync(saque);
        await _context.SaveChangesAsync();
        return Ok("Saque efetuado com sucesso");
    }
    /// <summary>
    /// Método para realizar a transferência de valores, da conta origem localizada pelo ID par conta
    /// destino localizada pelo CPF do titular.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="transferencia"></param>
    /// <returns></returns>
    [HttpPost("transferir/{id}")]
    public async Task<IActionResult> Transferir(int id, TransacaoTransferenciaDTO transferencia)
    {
        var contaOrigem = await _context.ContasCorrente.Where(c=> c.Id == id).FirstOrDefaultAsync();
        decimal valor = transferencia.Valor;
        var contaDestino = await _context.ContasCorrente.Where(c=> c.Titular.CPF == transferencia.CPF).FirstOrDefaultAsync();
        if (contaOrigem is null) return NotFound("Conta não encontrada");
        if (valor <= 0) return BadRequest("Valor inválido");
        if (valor > contaOrigem.Saldo) return BadRequest("Saldo insuficiente");
        contaOrigem.Sacar(valor);
        contaOrigem.AlteradaEm = transferencia.DataTransacao;

        if (contaDestino is null || !contaDestino.EstaAtiva)
        {
            contaOrigem.Depositar(valor);
            Transacao t = new()
            {
                ContaId = contaOrigem.Id,
                Valor = valor,
                TipoTransacao = Operacao.TRANSFERENCIA_ENVIADA,
                DataTransacao = transferencia.DataTransacao,
                Situacao = SituacaoTransacao.CANCELADA

            };
            await _context.Transacoes.AddAsync(t);
            await _context.SaveChangesAsync();
            return NotFound("Conta destino não encontrada");
        }
        contaDestino.Depositar(valor);
        contaDestino.AlteradaEm = transferencia.DataTransacao;
        Transacao env = new()
        {
            ContaId = contaOrigem.Id,
            Valor = valor,
            TipoTransacao = Operacao.TRANSFERENCIA_ENVIADA,
            DataTransacao = transferencia.DataTransacao,
            Situacao = SituacaoTransacao.SUCEDIDA,
            ContaDestinoOrigemId = contaDestino.Id
        };
        Transacao rec = new()
        {
            ContaId = contaDestino.Id,
            Valor = valor,
            TipoTransacao = Operacao.TRANSFERENCIA_RECEBIDA,
            DataTransacao = transferencia.DataTransacao,
            Situacao = SituacaoTransacao.SUCEDIDA,
            ContaDestinoOrigemId = contaOrigem.Id
        };
        await _context.Transacoes.AddAsync(rec);
        await _context.Transacoes.AddAsync(env);
        await _context.SaveChangesAsync();
        return Ok("Transferência efetuado com sucesso");

    }
}
