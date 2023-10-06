export const verifyRolePermission = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("in verify permission")
        if (! req?.role) return res.status(401).json({message: "Invalid role"});
        const rolesArray = [...allowedRoles];
        //console.log("allowed roles",rolesArray, req.body);
        const result = rolesArray.includes(req.role);
        console.log(result, req.role);
        if (!result) return res.status(401).json({message: "Invalid role"});
        next();
    }
}