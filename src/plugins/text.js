const text = {
    main: {
        title: "Тест бла бла",
        subtitle: "",
        text: "Для современного мира базовый вектор развития однозначно фиксирует необходимость кластеризации усилий. Как принято считать, элементы политического процесса, вне зависимости от их уровня, должны быть своевременно верифицированы. Равным образом, высокое качество позиционных исследований требует от нас анализа вывода текущих активов."
    },
    answer: {

    }
}

const questions = [
    {
        text: "Помыть раму",
        type: "radio",
        answer: null,
        rightAnser:0,
        options: [
            { text: "1+1= 2" },
            { text: "1+1d=2" },
            { text: "1+1=2" },
            { text: "1+s1=2" },
        ]
    },
    {
        text: "Помыть kaaaaaaaaaaaaak",
        type: "checkbox",
        answer: [],
        rightAnser:0,
        options: [
            { text: "1+1 =2" },
            { text: "1+1d= 2" },
            { text: "1+1= 2" },
            { text: "1+s1= 2" },
        ]
    },
    {
        text: "Наломать дров",
        type: "text",
        answer: "",
        rightAnser:0,
    }
]

export { text, questions };