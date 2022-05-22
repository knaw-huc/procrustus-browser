import {assign, Machine} from "xstate";

export const BrowseMachine = Machine<{
    paramCode: string
}, {
    states: {
        search: {},
        detail: {}
    }
}>(
    {
        id: "fetch",
        initial: "search",
        context: {
            paramCode: "none"
        },
        on: {
            detail: {
                actions: assign({
                    paramCode: (context, event) => event.paramCode
                }),
                target: "detail"
            },
            search: {
                actions: assign({
                    paramCode: (context, event) => event.paramCode
                }),
                target: "search"
            }
        }
    },
)