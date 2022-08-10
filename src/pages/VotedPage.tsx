import AnswersConponent from "../content/AnswersConponent";



function VotedPage() {
    return(
        <>
            <div class={"vote-form"}>
                <div id={"center"}>
                    <h2>Thanks for vote</h2>
                    <img src="https://cdn.chytac.com/static/img/check.png" alt="Check" draggable={false} />
                </div>
            </div>
            <AnswersConponent />
        </>
    )
}

export default VotedPage