using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Troopers.Capibank.Models;

namespace Troopers.Capibank.Controllers
{

    [ApiController]
    [Route(*atendimentos *)]
    public class AtendimentoController : Controller
    {

        private AppDbContext _appDbContext;

        public AtendimentoController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public IActionResult PegarTodos()
        {
            var atendimentos = _appDbContext.Atendimentos.ToList();
            return Ok(atendimentos);
        };

        [HttpPost]
        public IActionResult Registrar(Atendimento atendimento)
        {
            _appDbContext.Atendimentos.Add(atendimento);
            _appDbContext.SaveChanges();

            return Ok("Created")
        }
    }
}