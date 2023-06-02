import pool from '../config/connectionDB'
//CRUD

// READ
const getAllUser = async (req, res) => {

    const [row] = await pool.execute('SELECT * FROM users')

    return res.status(200).json({
        message: 'ok get all user',
        data: row,
    })
}

// CREATE
const createNewUser = async (req, res) => {

    const { firtName, lastName, email, adress } = req.body
    // validation
    if (!firtName || !lastName || !email || !adress) {
        return res.status(200).json({
            message: 'missing data',
        })
    }

    // create
    await pool.execute('INSERT INTO USERS(firtName,lastName,email,adress) VALUES(?,?,?,?)', [firtName, lastName, email, adress])

    return res.status(200).json({
        message: 'ok create new user ',
    })
}

// UPDATE
const updateUser = async (req, res) => {

    const { firtName, lastName, email, adress, ID } = req.body
    // validation
    if (!firtName || !lastName || !email || !adress || !ID) {
        return res.status(200).json({
            message: 'missing data',
        })
    }

    await pool.execute('UPDATE users SET firtName = ?, lastName = ?, email = ?, adress = ? WHERE ID = ?', [firtName, lastName, email, adress, ID])

    return res.status(200).json({
        message: 'ok update user',
    })
}

//DELETE 
const deleteUser = async (req, res) => {

    const { id: userID } = req.params

    if (!userID) {
        return res.status(200).json({
            message: 'missing data',
        })
    }

    await pool.execute('DELETE FROM users WHERE ID=?', [userID])

    return res.status(200).json({
        message: 'ok delete user',
    })
}

export {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
}