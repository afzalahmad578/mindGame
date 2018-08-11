
async function userDataList(payloadData) {
    let pipeline1 = [];
    let pipeline2 = [];
    let pipeline3 = [];
    let finalPipeline = [];

    let sortedby = payloadData.sortedby || 'registrationDate';
    let sortedtype = payloadData.sortedtype || -1;
    let sort = {}
    sort[sortedby] = sortedtype;

    if (payloadData.search && payloadData.search != "") {
        pipeline1.push({
            $match: {
                $or: [
                    { firstName: { $regex: payloadData.search, $options: "si" } },
                    { lastName: { $regex: payloadData.search, $options: "si" } },
                    { email: { $regex: payloadData.search, $options: "si" } }
                ]
            }
        })
    }
    if (payloadData.joiningFrom && payloadData.joiningFrom != "" && (payloadData.joiningTo == undefined || payloadData.joiningTo == "")) {
        pipeline2.push({
            $match: {
                registrationDate: {
                    $gte: new Date(parseInt(payloadData.joiningFrom))
                }
            }
        })
    }

    if (payloadData.joiningFrom && payloadData.joiningFrom != "" && payloadData.joiningTo && payloadData.joiningTo != "") {
        pipeline2.push({
            $match: {
                registrationDate: {
                    $gte: payloadData.joiningFrom,
                    $lte: payloadData.joiningTo
                }
            }
        })
    }
    pipeline3 = [
        {
            $match: {
                status: { $in: (payloadData.status && payloadData.status != "") ? [payloadData.status] : [constant.STATUS.ACTIVE, constant.STATUS.BLOCKED] }
            }
        },
        {
            $sort: sort
        },
        {
            $project: {
                _id: 1, firstName: 1, lastName: 1, email: 1, gender: 1, status: 1, accountType: 1,
                registrationDate: 1, profilePicURL: 1, verifiedDate: 1, isVerified: 1, dob: 1,
                phoneNo: 1
            }
        },
        { $skip: ((payloadData.pageNo - 1) * payloadData.limit) },
        { $limit: parseInt(payloadData.limit) }
    ];

    finalPipeline = finalPipeline.concat(pipeline1, pipeline2, pipeline3)
    let userData = await DBManager.aggregateData("Users", finalPipeline, {})
    return userData.length > 0 ? userData : []
}
/**
 * @description user listing
 * @param {*} req 
 * @param {*} res 
 */
exports.userListing = async (req, res) => {
    try {
        let userList = await userDataList(req.query);
        let userDataResponse = {
            userList: userList,
            userCount: userList.length
        }
        response(res, true, SuccessCode.SUCCESS, userDataResponse, SuccessMessage.USER_LIST_FETCH)
    } catch (error) {
        console.log('error--> ', error)
        response(res, false, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }
}