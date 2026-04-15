import CheckinClient from "./checkin-page";

export default function LoadingCheckin({ verseInfo } : { verseInfo : string }) {
    return (
        <CheckinClient 
            initialAttendees={[]} 
            loading={true}
            verse={verseInfo} 
            isThereProgramToday={true}
        />
    )
}