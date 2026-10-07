export function getHealth(_req, res) {
    res.status(200).json({
        success: true,
        service: "competitor-intelligence",
    });
}
