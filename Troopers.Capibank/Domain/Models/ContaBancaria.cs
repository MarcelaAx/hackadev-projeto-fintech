using Troopers.Capibank.Domain.Models;

namespace Troopers.Capibank.Models;

public abstract class ContaBancaria
{
    public int Id { get; set; }
    public int NumeroConta { get; set; }
    public Titular? Titular { get; set; }
    public decimal Saldo { get; protected set; }
    public bool EstaAtiva { get; set; } = true;
    public DateTime CriadaEm { get; set; } = DateTime.Now;
    public DateTime AlteradaEm { get; set; } = DateTime.Now;
    public DateTime BloqueadaEm { get; set; }

    public IEnumerable<Transacao> ListaTransacoes = [];
    

    public bool BloquearConta(int id)
    {
        return EstaAtiva = false;
    }
    public bool DesbloquearConta(int id)
    {
        return EstaAtiva = true;
    }
    public abstract bool ExcluirConta(int id);
    public abstract decimal Depositar(decimal valor);
    
}
