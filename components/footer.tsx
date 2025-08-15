export const Footer =()=>{
    return(
 <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Produtos</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Ar-condicionado</div>
                <div>Lava e Seca</div>
                <div>Geleira</div>
                <div>Lava-loiças</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Central de Ajuda</div>
                <div>Garantia</div>
                <div>Assistência Técnica</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sobre a Midea</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Nossa História</div>
                <div>Sustentabilidade</div>
                <div>Trabalhe Conosco</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Atendimento Oficial</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div>📞 258 82xxxxxxx</div>
                <div>📧 geral@coolmasters.com</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
}