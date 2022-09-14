import {createResource, For, Show} from "solid-js";
import {useParams} from "solid-app-router";


const fetchAnsObject = async (id: string) => (
    await fetch(`https://api.chytac.com/forms/vote/${id}/answers`)).json()


function AnswersComponent() {
    const params = useParams();

    const [ans] = createResource(params.id, fetchAnsObject);

    return(
        <div class={"vote-form"}>
            <Show when={(ans() != undefined)} fallback={
                <>
                    <div id={"center"}>
                        <h2>Vote and be first in answers!</h2>
                    </div>
                </>
            }>
                <h2>Answers</h2>
                <div id={"result-table"}>
                    <div class={"result-line"}>
                        <div class={"result-td"}></div>
                        <For each={ans().votes} fallback={<th>Loading...</th>}>{(item:{id: number, date: string}) =>
                            <div class={"result-th"}>
                                <div class={"result-dates"}>
                                    <div>{new Date(Date.parse(item.date)).toLocaleDateString("cs-CZ", {day: 'numeric', month: 'numeric'})}</div>
                                    <div>{new Date(Date.parse(item.date)).toLocaleString("cs-CZ", {weekday: 'long'})}</div>
                                    <div>{new Date(Date.parse(item.date)).toLocaleTimeString("cs-CZ", {hour: 'numeric', minute: 'numeric'})}</div>
                                    <div class={"result-an"}> <img src="https://cdn.chytac.com/static/img/check.png" alt="Check"/></div>
                                </div>
                            </div>
                        }</For>
                    </div>
                    <For each={ans().answers} fallback={<td>Loading...</td>}>{(item: {authorName: string, listOfAnswers: []}) =>
                        <div class={"result-line"}>
                            <div class={"result-td"}>{item.authorName}</div>

                            <For each={item.listOfAnswers} fallback={<div>Loading...</div>}>{(item: {type: number}) =>
                                <div class={"result-td"}>
                                    {getAnswer(item.type)}
                                </div>
                            }</For>
                        </div>
                    }</For>
                </div>
            </Show>
        </div>
    )
}

function getData(url: string): string{
    let resp: string = ""

    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                resp = data
            }).catch((err) => {
                resp = err
            })
        })

    return resp
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