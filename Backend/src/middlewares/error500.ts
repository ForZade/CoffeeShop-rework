export default async function handleError500(err: any, req: any, res: any, next: any) {
    console.log(err);
    res.status(500).json({
        message: "Internal server error",
        error: err
    });
}