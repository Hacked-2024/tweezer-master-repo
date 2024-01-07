const MODERATION_ATTRIBS = ["Harassment", "Self Harm", "Hate", "Sexual Content", "Minors", "Violence"]

const extractModerationContentCategories = ( moderationObj ) => {
    const categories = moderationObj.categories
    const result = {
        "Harassment": categories["harassment"],
        "Hate": categories["hate"],
        "Self Harm": categories["self-harm"],
        "Sexual": categories["sexual"],
        "Violence": categories["violence"],    
    }

    return result
}

const extractModerationContentScores = ( moderationObj ) => {
    const scores = moderationObj.category_scores
    
    const result = {
        "Harassment": Math.round(scores["harassment"] * 10),
        "Hate": Math.round(scores["hate"] * 10) ,
        "Self Harm": Math.round(scores["self-harm"] * 10),
        "Sexual Content": Math.round(scores["sexual"] * 10),
        "Violence": Math.round(scores["violence"] * 10) ,    
    }

    return result
}



export default {
    extractModerationContentScores, MODERATION_ATTRIBS
}