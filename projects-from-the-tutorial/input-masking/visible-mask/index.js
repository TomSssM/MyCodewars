class VisibleInputMasking {
    constructor() {
    }
}

// pseudo code:
// find a diff between the old and new input value
// if something was *just* deleted ( with or without modifying the affected area ) iterate over the non-mask chars and set the mask chars aright between them ( the way we came up with it on Sunday evening )
// if something was *just* added ( without deletions ), take the excessive characters, and keep replacing _
// if you hit the non-_ character, keep pushing everything to the right
