export interface selectedAPIInterface {
    id: string | null,
    name: string | null,
    method: string | null,
    url: string | null,
    authenticationType: string | null,
    headers: [
        { key: string, value: string }
    ] | null,
    query_parameters: [
        { key: string, value: string }
    ] | null,

    request_body: [
        {
            name: string,
            regex: string, //todo 
            parameter_type: string,
            required: boolean,
        }
    ] | null,
    // request_body: {
    //     [name: string]: {
    //         name: string,
    //         regex: string, //todo 
    //         parameter_type: string,
    //         required: boolean,

    //     }
    // } | null,
    response_body: [
        {
            status: number,
            body: [
                { key: string, value: string }
            ]
        }
    ] | null

}


export interface curlApiInterface {
    name: string | null,
    url: string | null,
    method: string | null,
    authenticationType: string | null,
    header: [
        { key: string, value: string, inputValue: any, }
    ] | null,
    query_parameters: [
        { key: string, value: string, inputValue: any, }
    ] | null,

    request_body: [
        {
            name: string,
            regex: string, //todo 
            parameter_type: string,
            required: boolean,
            inputValue: any,
        }
    ] | null,
} 