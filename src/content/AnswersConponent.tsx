import {For} from "solid-js";

let answersCount: number[] = []

function AnswersComponent() {
    const ansData = "[{\"authorName\":\"asd\",\"listOfAnswers\":[{\"idDate\":2,\"type\":2},{\"idDate\":3,\"type\":2},{\"idDate\":4,\"type\":2}]},{\"authorName\":\"kxokTest\",\"listOfAnswers\":[{\"idDate\":2,\"type\":1},{\"idDate\":3,\"type\":0},{\"idDate\":4,\"type\":1}]},{\"authorName\":\"Lukáš\",\"listOfAnswers\":[{\"idDate\":2,\"type\":2},{\"idDate\":3,\"type\":0},{\"idDate\":4,\"type\":0}]},{\"authorName\":\"KubaX\",\"listOfAnswers\":[{\"idDate\":2,\"type\":0},{\"idDate\":3,\"type\":1},{\"idDate\":4,\"type\":0}]},{\"authorName\":\"OMEGALUL\",\"listOfAnswers\":[{\"idDate\":2,\"type\":0},{\"idDate\":3,\"type\":0},{\"idDate\":4,\"type\":0}]}]"
    const voteDate = "{\"name\":\"Day for cookie??\",\"description\":\"desc on top\",\"listOfDates\":[{\"id\":2,\"date\":\"2022-06-08T18:00:12.869908\"},{\"id\":3,\"date\":\"2022-06-07T17:00:12.86993\"},{\"id\":4,\"date\":\"2022-06-06T18:00:12.869936\"}]}"

    const ansByNameArray: {authorName: string, listOfAnswers: {idDate: number, type:number}[]}[] = JSON.parse(ansData)
    const voteObject: { name: string, description: string, listOfDates: {date: string, id:number}[] } = JSON.parse(voteDate)

    voteObject.listOfDates.forEach((i) => {
        answersCount[i.id] = 0
    })

    ansByNameArray.forEach((i) => {
        i.listOfAnswers.forEach((a) =>{
            if (a.type == 0){
                answersCount[a.idDate]++
            }
        })
    })

    return(
        <div class={"vote-form"}>
            <h2>Answers</h2>
            <div id={"result-table"}>
                <div class={"result-line"}>
                    <div class={"result-td"}></div>
                    <For each={voteObject.listOfDates} fallback={<th>Loading...</th>}>{(item) =>
                        <div class={"result-th"}>
                            <div class={"result-dates"}>
                                <div>{new Date(Date.parse(item.date)).toLocaleDateString("cs-CZ", {day: 'numeric', month: 'numeric'})}</div>
                                <div>{new Date(Date.parse(item.date)).toLocaleString("cs-CZ", {weekday: 'long'})}</div>
                                <div>{new Date(Date.parse(item.date)).toLocaleTimeString("cs-CZ", {hour: 'numeric', minute: 'numeric'})}</div>
                                <div class={"result-an"}>{answersCount[item.id]} <img src="https://cdn.chytac.com/static/img/check.png" alt="Check"/></div>
                            </div>
                        </div>
                    }</For>
                </div>
                <For each={ansByNameArray} fallback={<td>Loading...</td>}>{(item) =>
                    <div class={"result-line"}>
                        <div class={"result-td"}>{item.authorName}</div>

                        <For each={item.listOfAnswers} fallback={<div>Loading...</div>}>{(item) =>
                            <div class={"result-td"}>
                                {getAnswer(item.type)}
                            </div>
                        }</For>
                    </div>
                }</For>
            </div>
        </div>
    )
}

function getAnswer(level: number) {
    switch (level){
        case 0:
            return(<div class={"res-1"}><img src="https://cdn.chytac.com/static/img/check.png" alt="Check" draggable={false} /></div>)
        case 1:
            return(<div class={"res-2"}><img src="https://cdn.chytac.com/static/img/question-mark.png" alt="Question mark" draggable={false} /></div>)
        case 2:
            return(<div class={"res-3"}><img src="https://cdn.chytac.com/static/img/cross.png" alt="Cross" draggable={false} /></div>)
        default:
            return(<div class={"res-2"}><img src="https://cdn.chytac.com/static/img/question-mark.png" alt="Question mark" draggable={false} /></div>)
    }
}

export default AnswersComponent