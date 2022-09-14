import {createSignal, For, Show} from "solid-js";

import '/src/assets/css/create.css'

type DateItem = {
    date: Date
}

/**
 * {
 *   "name": "okLol",
 *   "description": "sdfsdf",
 *   "listOfDates": [
 *     {
 *       "date": "2022-06-08T21:17:00"
 *     },
 *     {
 *       "date": "2022-06-08T21:17:00"
 *     },
 *     {
 *       "date": "2022-06-08T21:17:00"
 *     }
 *   ]
 * }
 */

type DateSubmitItem = {
    date: string
}

type SubmitCreateItem = {
    name: string,
    description: string,
    listOfDates: DateSubmitItem[]
}

const [plusDate, setPlusDate] = createSignal(0)
const [updateS, setUpdateS] = createSignal(0)
const datesArray: DateItem[] = []

const [inputTitle, setInputTitle] = createSignal("")
const [inputDesc, setinputDesc] = createSignal("")

const [isCreated, setCreated] = createSignal(false)
const [voteLink, setVoteLink] = createSignal("")

function CreatePage(){
    return(
        <>
            <Show when={!isCreated()} fallback={
                <>
                    <div class={"vote-form"}>
                        <div id={"center"}>
                            <h2>Created su</h2>
                            <p>Share: <a href={"http://localhost:3000/vote/" + voteLink()}>localhost:3000/vote/{voteLink()}</a></p>
                            <img src="https://cdn.chytac.com/static/img/check.png" alt="Check" draggable={false} />
                        </div>
                    </div>
                </>
            }>
                <div class={"vote-form"}>
                    <h2>Create new vote</h2>
                    <div id={"vote-input"}>
                        <div class={"input-name-text"}>Title <span>*</span></div>
                        <input type="text" id={"input-title"} class={"input-text"} value={inputTitle()} onInput={(e) => setInputTitle(e.currentTarget.value)}/>
                        <div class={"input-name-text"}>Description</div>
                        <textarea name="input-description" id="input-description"  class={"input-textarea"} cols="20" rows="5" value={inputDesc()} onInput={(e) => setinputDesc(e.currentTarget.value)}></textarea>
                    </div>
                    {drawCalendar()}
                    <input type="submit" id={"input-submit"} onClick={(e) => createNewVote()} />
                </div>
            </Show>
        </>
    )
}

function drawCalendar(){
    const nowDate = new Date()

    const date = new Date(nowDate.getFullYear(), nowDate.getMonth() + plusDate(), nowDate.getDate())
    let calendarArray: number[] = []

    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let xddd = updateS()

    let realFirstDay: number = firstDay.getDay()
    if (realFirstDay == 0) realFirstDay = 7

    let count = 0
    for(let i = -(realFirstDay - 1); i <= lastDay.getDate(); i++){
        if (i != 0){
            calendarArray[count++] = i
        }
    }

    count = 1
    console.log(calendarArray)
    return(
        <div id={"calendar"}>
            <div id={"calendar-title"}>
                <div>{date.toLocaleDateString("cs-CZ", {month: 'long', year: 'numeric'})}</div>
                <div id={"add-buttons"}>
                    <button onClick={(e) => {
                        setPlusDate(plusDate() - 1)
                    }}>&#60;</button>
                    <button onClick={(e) => {
                        setPlusDate(plusDate() + 1)
                    }}>&#62;</button>
                </div>
            </div>
            <div id={"calendar-week"}>
                <div class={"week"}>Po</div>
                <div class={"week"}>Út</div>
                <div class={"week"}>St</div>
                <div class={"week"}>Čt</div>
                <div class={"week"}>Pá</div>
                <div class={"week"}>So</div>
                <div class={"week"}>Ne</div>
            </div>
            <div id={"calendar-panel"}>
                <div id={"calendar-days"}>
                    <For each={calendarArray} fallback={<div>Loading... </div>}>{(item) =>
                        <>
                            {drawDay(item, count++)}
                        </>
                    }</For>
                </div>
                <div id={"calendar-selected"}>
                    <For each={datesArray} fallback={<div>Click on date in calendar </div>}>{(item, index) =>
                        <>
                            {renderDate(item.date, index())}
                        </>
                    }</For>
                </div>
            </div>
        </div>
    )
}

function drawDay(day: number, count: number) {
    if (day < 0){
        return(
            <>
                <button class={"calendar-day disabled-day"}  disabled={true}></button>
            </>
        )
    }if (count % 7 == 0){
        return(
            <>
                <button class={"calendar-day"} onClick={(e) => {
                    addDate(day)
                }}>{day + " "} </button><br/>
            </>
        )
    }else{
        return(
            <>
                <button class={"calendar-day"} onClick={(e) => addDate(day)}>{day + " "} </button>
            </>
        )
    }
}

function addDate(day: number) {
    const nowDate = new Date()
    const date = new Date(nowDate.getFullYear(), nowDate.getMonth() + plusDate(), day)

    datesArray.push({date: date})
    setUpdateS(updateS()+1)

    console.log(datesArray)
}

function removeDate(key: number) {
    const index = datesArray.indexOf(datesArray[key], 0);
    if (index > -1) {
        datesArray.splice(index, 1);
        setUpdateS(updateS()+1)
    }
}

function renderDate(date: Date, key: number) {
    return (
        <div class='selected-date'>
            <div class={"sel-date"}>{date.toLocaleDateString("cs-CZ", {day: 'numeric', month: 'short'})}</div>
            <div class={"sel-title"}>
                <div class={"sel-name"}>{date.toLocaleString("cs-CZ", {weekday: 'long'})} </div>
                <div class={"sel-date"}>{date.toLocaleTimeString("cs-CZ", {hour: 'numeric', minute: 'numeric'})}</div>
            </div>
            <div class={"sel-control"}>
                <input type="time" value={date.getHours() + ":" + date.getMinutes()} onChange={(e) => {
                    updateTime(date, key, e.currentTarget.value)
                    console.log(e.currentTarget.value)
                }}/>
                <button onClick={(e) => removeDate(key)}><img src="https://cdn.chytac.com/static/img/cross.png" alt="Cross" draggable={false} /></button>
            </div>
        </div>
    )
}

function updateTime(date: Date, key: number, time: string) {
    date.setHours(Number(time.split(":")[0]), Number(time.split(":")[1]))
    datesArray[key] = {date}
    setUpdateS(updateS()+1)
}

function createNewVote() {
    let submitCreate: SubmitCreateItem = {
        name: inputTitle(),
        description: inputDesc(),
        listOfDates: []
    }

    datesArray.forEach((e) => {
        let d: string = e.date.toISOString()
        submitCreate.listOfDates.push({date: d})
    })


    fetch("https://api.chytac.com/forms/vote", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitCreate)
    }).then((response) => {
        response.json().then((data) => {
            setVoteLink(data.id);
        }).catch((err) => {
            setVoteLink(err);
        })
    });

    setCreated(true)
}

export default CreatePage