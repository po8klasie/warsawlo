import { getCurrentUser, getUser } from './users'
import Dexie from 'dexie';

export const addToChoices = async (regon) => {
    const User = await getCurrentUser()
    console.log(User)
    User.choices.put({
        regon,
        place: 100,
        notes: ''
    })
}
export const removeFromChoices = async (regon) => {
    const User = await getCurrentUser()

    return User.choices.delete(regon)
}

export const isInChoices = async (regon) => {
    const User = await getCurrentUser()
    let choices = await User.choices.where('regon').equals(regon).count()
    return choices > 0
}