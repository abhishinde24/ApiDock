export interface selectedAPIInterface {
    name: string | null,
    method: string | null,
    id: string | null,
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
