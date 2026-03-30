import CheckinClient from "./checkin-client";

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