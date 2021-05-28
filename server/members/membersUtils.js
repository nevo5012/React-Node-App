import member from './memberModel.js'


export function getAllMembers()
{
    return new Promise((resolve , reject)=>
    {
        member.find({}, function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(data)
            }
        })
    })
}



// GET a member data
export function getAMember(id)
    {
        return new Promise((resolve, reject) =>
        {
            member.findById(id, function(err,data)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve(data)
                }
            })
        })
    }


export function addMember(data)
    {
        console.log(data);
        return new Promise((resolve, reject) =>
        {
            let toAdd = new member({
                first_name : data.first_name,
                last_name : data.last_name,
                city : data.city,
                street : data.street,
                house_number : data.house_number,
                orders : data.orders
            })
            toAdd.save(function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('Created!')
                }
            })
        })

    }

export function updateMember(id, data)
{
    return new Promise((resolve,reject) =>
    {
        member.findByIdAndUpdate(id, {
            first_name : data.first_name,
            last_name : data.last_name,
            city : data.city,
            street : data.street,
            house_number : data.house_number,
            orders : data.orders
        },function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('Updated')
            }
        })
    })
}

// Delete
export function deleteMember(id)
{
    return new Promise((resolve, reject) =>
    {
        member.findByIdAndDelete(id, function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('Deleted!')
            }
        })
    })
}