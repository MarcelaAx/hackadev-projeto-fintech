using Troopers.Capibank.Models;

namespace Troopers.Capibank.Models;

    public class ContaEmpresarial : ContaBancaria
    {
        public int CNPJ { get; set; }

        public ContaEmpresarial(int numeroConta, Titular titular, int cnpj) : base(numeroConta, titular)
        {
            CNPJ = cnpj;
        
        }

        public string GerarLinkdePagamento()
        {
            // Lógica para gerar o link de pagamento
            return "Link de pagamento gerado";
        }
    }
