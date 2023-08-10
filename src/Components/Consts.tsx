export const handleTypeService = {
  success: {
    title: "Requisição feita com sucesso!",
    description: "Requisição feita com sucesso!",
    color: "#9fc54d",
  },
  error: {
    title: "Erro ao efetuar a requisição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
  loginError: {
    title: "Erro ao tentar entrar na sessão!",
    description: "Usuário e/ou senha podem estar errados.",
    color: "#ff6464",
  },
  resetError: {
    title: "Erro ao redefinir senha!",
    description: "Confira se o email está correto e tente novamente.",
    color: "#ff6464",
  },
  postError: {
    title: "Erro ao agendar edição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },
};

export const ptLocale = {
  months: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],

  weekDays: [
    {
      name: "Domingo",
      short: "D",
      isWeekend: true,
    },
    {
      name: "Segunda-feira",
      short: "S",
    },
    {
      name: "Terça-feira",
      short: "T",
    },
    {
      name: "Quarta-feira",
      short: "Q",
    },
    {
      name: "Quinta-feira",
      short: "Q",
    },
    {
      name: "Sexta-feira",
      short: "S",
    },
    {
      name: "Sábado",
      short: "S",
      isWeekend: true,
    },
  ],

  weekStartingIndex: 0,

  getToday(gregorainTodayObject: any) {
    return gregorainTodayObject;
  },

  toNativeDate(date: any) {
    return new Date(date.year, date.month - 1, date.day);
  },

  getMonthLength(date: any) {
    return new Date(date.year, date.month, 0).getDate();
  },

  transformDigit(digit: any) {
    return digit;
  },

  nextMonth: "Próximo Mês",
  previousMonth: "Mês Anterior",
  openMonthSelector: "Abrir Selecionador de Mês",
  openYearSelector: "Abrir Selecionador de Ano",
  closeMonthSelector: "Fechar Selecionador de Mês",
  closeYearSelector: "Fechar Selecionador de Ano",
  defaultPlaceholder: "Selecionar...",

  from: "de",
  to: "até",

  digitSeparator: ",",

  yearLetterSkip: 0,

  isRtl: false,
};
