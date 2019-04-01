import Dexie from 'dexie'
import dbSchema from './dbSchema';

export const addUser = (username) => new Promise((resolve, reject) => {
    Dexie.exists(`userdata_${username}`).then(exists => {
        if (!exists) {
            let db = new Dexie(`userdata_${username}`);
            db.version(1).stores(dbSchema)
            db.open().then(() => resolve(db))
            return
        }
        reject('user exists')
    })
})

export const getUser = (username) => new Promise((resolve, reject) => {
    Dexie.exists(`userdata_${username}`).then(exists => {
        if (exists) {
            let db = new Dexie(`userdata_${username}`);
            db.version(1).stores(dbSchema)
            db.open().then(() => resolve(db))
            return
        }
        reject('user does not exist')
    })
})
export const getUsernames = async () => {
    let dbs = await Dexie.getDatabaseNames()
    return dbs.filter(dbname => dbname.startsWith('userdata_')).map(dbname => dbname.replace('userdata_', ''))
}


export const setCurrentUser = (username) => new Promise((resolve, reject) => {
    getUser(username).then(user => {
        localStorage.currentUser = typeof window !== 'undefined' ? username : ''
        resolve(user)
    }).catch(err => reject(err))
})
export const getCurrentUsername = () => typeof window !== 'undefined' ? localStorage.currentUser : {}
export const getCurrentUser = () => getUser(getCurrentUsername())