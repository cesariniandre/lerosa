export interface Option {
  id: string;
  text: string;
}
export interface Question {
  id: number;
  text: string;
  options: Option[];
}
export interface PriorityQuestionType {
  id: string;
  text: string;
  options: Option[];
}
export const questions: Question[] = [{
  id: 1,
  text: "Corre ou segue o plano\n\nSuponha que você investiu em um fundo de ações, naturalmente com maior volatilidade, mas com perspectivas de boa rentabilidade. No primeiro ano, o investimento caiu 10%. Nesse mesmo período, outro fundo no mesmo segmento subiu 15%. O que você faz?",
  options: [{
    id: "1A",
    text: "A) Invisto mais para recuperar a perda e aproveitar a possível recuperação."
  }, {
    id: "1B",
    text: "B) Resgato tudo e realoco para o fundo que subiu 15%."
  }, {
    id: "1C",
    text: "C) Não faço nada. Costumo escolher esses investimentos pensando no longo prazo."
  }, {
    id: "1D",
    text: "D) Resgato e deixo em um investimento conservador."
  }]
}, {
  id: 2,
  text: "Reserva inesperada\n\nVocê recebe um valor inesperado equivalente a 6 meses do seu custo de vida. Entre as alternativas abaixo, como pretende utilizá-lo?",
  options: [{
    id: "2A",
    text: "A) Faço uma reserva de emergência conservadora"
  }, {
    id: "2B",
    text: "B) Invisto em ativos de risco para ganhos de curto prazo"
  }, {
    id: "2C",
    text: "C) Invisto em ativos de longo prazo, sem me preocupar com saques ou retiradas"
  }, {
    id: "2D",
    text: "D) Não sei, precisaria avaliar. Afinal, esse valor não muda minha realidade."
  }]
}, {
  id: 3,
  text: "Nova \"cripto\" no mercado\n\nSuponha que acaba de surgir uma nova criptomoeda que promete dividir o protagonismo com o Bitcoin. Você tem a oportunidade de investir logo no início, por um preço baixo, mas é esperado que exista uma grande volatilidade. O que você faz?",
  options: [{
    id: "3A",
    text: "A) Invisto 10% do meu patrimônio. Não quero deixar passar essa oportunidade."
  }, {
    id: "3B",
    text: "B) Invisto 5% do meu patrimônio. Aceito um pouco o risco, pode ser uma boa oportunidade"
  }, {
    id: "3C",
    text: "C) Invisto 1% do meu patrimônio. Só para manter alguma diversificação e ter a chance de valorização"
  }, {
    id: "3D",
    text: "D) Não invisto. Fico aliviado(a) por ficar de fora."
  }]
}, {
  id: 4,
  text: "Planos de sucessão\n\nConsiderando o seu patrimônio e sua realidade atual, quais são os seus planos e o que seria viável sobre sucessão e segurança financeira da sua família?",
  options: [{
    id: "4A",
    text: "A) Estruturar um plano de sucessão com testamento e holdings para facilitar a transferência de patrimônio e minimizar impostos."
  }, {
    id: "4B",
    text: "B) Investir uma parte do patrimônio em ativos de longo prazo, que possam crescer e sustentar as próximas gerações, mesmo que isso envolva riscos maiores."
  }, {
    id: "4C",
    text: "C) Mantenho meu patrimônio mais líquido, evito riscos e deixo que minha família decida no futuro o que fazer."
  }, {
    id: "4D",
    text: "D) Não me preocupo com essa questão."
  }]
}, {
  id: 5,
  text: "Hora de ajustar?\n\nCom um determinado dinheiro, você comprou ações da Empresa ABC e da Empresa XYZ (50% cada), que são concorrentes no mesmo setor, possuem a mesma relevância e são operacionalmente muito similares. Passado 1 mês, a cotação da Empresa ABC subiu 5% enquanto a Empresa XYZ caiu 3%. Das alternativas abaixo, qual você escolheria?",
  options: [{
    id: "5A",
    text: "A) Vendo as duas. Fico com a rentabilidade de 2%"
  }, {
    id: "5B",
    text: "B) Vendo ABC e mantenho XYZ"
  }, {
    id: "5C",
    text: "C) Vendo ABC e compro mais XYZ"
  }, {
    id: "5D",
    text: "D) Mantenho as duas posições"
  }]
}, {
  id: 6,
  text: "Furo no orçamento\n\nSe amanhã você perdesse todos os rendimentos da sua carteira dos últimos 3 meses, como isso impactaria sua vida?",
  options: [{
    id: "6A",
    text: "A) Impactaria muito. Dependo desses rendimentos mensalmente"
  }, {
    id: "6B",
    text: "B) Impactaria razoavelmente, esses rendimentos complementam minha renda"
  }, {
    id: "6C",
    text: "C) Impactaria pouco, gosto de usar esses rendimentos para gastos eventuais"
  }, {
    id: "6D",
    text: "D) Não impactaria. Não dependo desses rendimentos no dia a dia, mas ficaria frustrado."
  }]
}, {
  id: 7,
  text: "Travado por 5 anos\n\nUm amigo fiél e honesto lhe oferece um investimento ilíquido em imóveis, com alta rentabilidade projetada, risco controlado, mas que exigirá 5 anos sem saque. Considerando que você não precisa desse dinheiro para o dia a dia, qual sua decisão?",
  options: [{
    id: "7A",
    text: "A) Aceito. Meu foco é no longo prazo."
  }, {
    id: "7B",
    text: "B) Recuso. Gosto da ideia, mas quero ver se existe outra alternativa mais interessante."
  }, {
    id: "7C",
    text: "C) Recuso. Se não entendo do negócio, prefiro não participar."
  }, {
    id: "7D",
    text: "D) Recuso. Não gosto de investimentos sem liquidez."
  }]
}, {
  id: 8,
  text: "Seguros: essencial ou dispensável?\n\nSobre seguros, qual frase mais se aplica ao seu caso:",
  options: [{
    id: "8A",
    text: "A) Não tenho seguros"
  }, {
    id: "8B",
    text: "B) Tenho seguro apenas para o básico (saúde, automotivo)"
  }, {
    id: "8C",
    text: "C) Tenho seguros para proteger parte do meu patrimônio"
  }, {
    id: "8D",
    text: "D) Tenho seguros para proteger a maior parte do meu patrimônio, inclusive seguro de vida para sucessão."
  }]
}, {
  id: 9,
  text: "Herdar é fácil, decidir é difícil\n\nVocê descobre hoje que herdou ações de uma empresa, da qual você não tem informações. Ao ver na internet, descobre que ela está sendo negociada a R$ 10,00 por ação e é um ativo extremamente volátil. E tem um detalhe: você ainda não pode vendê-las até finalizar o processo de inventário. Passado algum tempo, a ação finalmente está na sua carteira de investimentos, mas agora e ela está sendo negociada a R$ 8,00. O que você faz?",
  options: [{
    id: "9A",
    text: "A) Vendo tudo imediatamente. Não quero esse risco."
  }, {
    id: "9B",
    text: "B) Não faço nada. Só vendo quando bater R$ 10,00."
  }, {
    id: "9C",
    text: "C) Compro mais ações para fazer preço médio e vender assim que possível"
  }, {
    id: "9D",
    text: "D) Avalio a empresa e considero manter em carteira por muitos anos, se for o caso"
  }]
}, {
  id: 10,
  text: "Destino do patrimônio\n\nQuando pensa no seu patrimônio atual, qual dessas ideias mais combina com a sua visão:",
  options: [{
    id: "10A",
    text: "A) Quero que ele continue crescendo e beneficiando minhas futuras gerações."
  }, {
    id: "10B",
    text: "B) Quero um equilíbrio entre aproveitar a vida e deixar algo organizado para o futuro."
  }, {
    id: "10C",
    text: "C) Quero que ele me proporcione conforto e segurança agora. Ainda tenho tempo para pensar no resto."
  }, {
    id: "10D",
    text: "D) Não tenho essa preocupação. Vivo bem com minha renda e cada um deve construir seu próprio caminho."
  }]
}, {
  id: 11,
  text: "A Oferta Irrecusável\n\nVocê recebe uma proposta inesperada: um empresário quer comprar um de seus principais ativos (um imóvel, uma empresa e etc). Ele oferece 30% acima do valor de mercado, mas você nunca pensou em vender. A proposta é válida por 48 horas. O que faz?",
  options: [{
    id: "11A",
    text: "A) Vendo imediatamente. Uma oferta acima do mercado é rara e não posso perder essa oportunidade."
  }, {
    id: "11B",
    text: "B) Tento negociar um preço ainda maior antes de decidir. Sempre dá para extrair mais valor."
  }, {
    id: "11C",
    text: "C) Consulto especialistas e avalio se há sentido em vender ou manter. Decido com base nos dados."
  }, {
    id: "11D",
    text: "D) Recuso a oferta. Se nunca pensei em vender, é porque esse ativo tem valor estratégico para mim."
  }]
}];
export const priorityQuestion: PriorityQuestionType = {
  id: "priority",
  text: "As prioridades da vida\n\nDas opções abaixo, coloque em ordem de 1 a 6 aquilo que é mais importante para você nesse momento, sendo 1 a sua principal prioridade:",
  options: [{
    id: "pA",
    text: "A) Evitar riscos financeiros"
  }, {
    id: "pB",
    text: "B) Garantir o acesso imediato ao meu dinheiro"
  }, {
    id: "pC",
    text: "C) Estruturar a sucessão para meus filhos"
  }, {
    id: "pD",
    text: "D) Fazer meu patrimônio crescer e ter uma aposentadoria tranquila"
  }, {
    id: "pE",
    text: "E) Fazer meu dinheiro trabalhar e gerar uma renda extra"
  }, {
    id: "pF",
    text: "F) Ver meu dinheiro crescer imediatamente"
  }]
};