import {useParams} from "solid-app-router"
import {createResource, createSignal, For, Show} from "solid-js"
import AnswersConponent from "../content/AnswersConponent";

let voteSubmitRequest: object
let optionsArray: { idDate: number, type: number }[] = []
const [voted, setVoted] = createSignal(false)

const fetchDataObject = async (id: string) => (
    await fetch(`https://api.chytac.com/forms/vote/${id}/`)).json()

function VotePage() {
    const params = useParams()

    const [vote] = createResource(params.id, fetchDataObject);

    let orderNumber = 0

    return (
        <>
            <Show when={!voted()} fallback={
                <div class={"vote-form"}>
                    <div id={"center"}>
                        <h2>Thanks for vote</h2>
                        <img src="https://cdn.chytac.com/static/img/check.png" alt="Check" draggable={false}/>
                    </div>
                </div>
            }>
                <Show when={vote() != undefined}>
                    <div class={"vote-form"}>
                        <h2>{vote().name}</h2>
                        <div id={"vote-description"}>{vote().description}</div>

                        <div id={"vote-options"}>
                            <h3>Dates <span>*</span></h3>
                            <For each={vote().listOfDates} fallback={<div>Loading...</div>}>{(item:{id: number, date: string}) =>
                                <>
                                    {voteOption("ok", new Date(Date.parse(item.date)), orderNumber++, item.id)}
                                </>
                            }</For>
                        </div>
                        <div id={"vote-input"}>
                            <div class={"input-name-text"}>Name <span>*</span></div>
                            <input type="text" id={"input-name"} class={"input-text"} placeholder={"Enter your name"}/>
                        </div>
                        <button onClick={e => submitVote(params.id)} id={"input-submit"}>Vote</button>
                        <div id={"errorMessages"}></div>
                    </div>
                </Show>
            </Show>

            <AnswersConponent />
        </>
    )
}

function voteOption(name: string, date: Date, order: number, id: number) {
    optionsArray[order] = {
        idDate: id,
        type: 2
    }

    return(
        <div class={"vote-option"}>
            <div class={"opt-date"}>{date.toLocaleDateString("cs-CZ", {day: 'numeric', month: 'short'})}</div>
            <div class={"opt-title"}>
                <div class={"opt-name"}>{date.toLocaleString("cs-CZ", {weekday: 'long'})} </div>
                <div class={"opt-date"}>{date.toLocaleTimeString("cs-CZ", {hour: 'numeric', minute: 'numeric'})}</div>
            </div>
            <div class={"opt-opts"}>
                <button class={"opt-ok"} onClick={(e) => changeStatus(0, order, id)}><img src="https://cdn.chytac.com/static/img/check.png" alt="Check" draggable={false} /></button>
                <button class={"opt-asi"} onClick={(e) => changeStatus(1, order, id)}><img src="https://cdn.chytac.com/static/img/question-mark.png" alt="Question mark" draggable={false} /></button>
                <button class={"opt-neok"} onClick={(e) => changeStatus(2, order, id)} style={"background-color: var(--second-color);"} ><img src="https://cdn.chytac.com/static/img/cross.png" alt="Cross" draggable={false} /></button>
            </div>
        </div>
    )
}

function changeStatus(status: number,order:number, id: number) {
    const optionObject: { idDate: number, type: number } = {
        idDate: id,
        type: status
    }

    switch (status) {
        case 0:
            document.getElementsByClassName("opt-ok").item(order)!.setAttribute("style", "background-color: #039908;")
            document.getElementsByClassName("opt-asi").item(order)!.setAttribute("style", "background-color: var(--background);")
            document.getElementsByClassName("opt-neok").item(order)!.setAttribute("style", "background-color: var(--background);")
            break
        case 1:
            document.getElementsByClassName("opt-ok").item(order)!.setAttribute("style", "background-color: var(--background);")
            document.getElementsByClassName("opt-asi").item(order)!.setAttribute("style", "background-color: #b5a302;")
            document.getElementsByClassName("opt-neok").item(order)!.setAttribute("style", "background-color: var(--background);")
            break
        case 2:
            document.getElementsByClassName("opt-ok").item(order)!.setAttribute("style", "background-color: var(--background);")
            document.getElementsByClassName("opt-asi").item(order)!.setAttribute("style", "background-color: var(--background);")
            document.getElementsByClassName("opt-neok").item(order)!.setAttribute("style", "background-color: var(--second-color);")
            break
    }

    optionsArray[order] = optionObject
}

async function submitVote(pageId: string) {
    const target = document.getElementById("input-name") as HTMLInputElement
    const errorDiv = document.getElementById("errorMessages")!

    if (target.value == null || target.value == ""){
        errorDiv.textContent = "Please enter name"
    }else if( target.value.length < 3){
        errorDiv.textContent = "Please enter name longer than 3 chars"
    }else{
        voteSubmitRequest = {
            authorName: target.value,
            listOfAnswers: optionsArray
        }

        const response = await fetch("https://api.chytac.com/forms/vote/" + pageId + "/answer", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(voteSubmitRequest)
        })
        console.log(response)
        setVoted(true)
        window.history.pushState({},"","/vote/" + pageId + "/voted");
    }
}

export default VotePage