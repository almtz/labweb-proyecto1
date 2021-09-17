export default function handler(req, res) {
    console.log(req.body.name);
    console.log(req.body.info);
    console.log(req.body.desc);
    res.status(200).json({ user: 'Ada Lovelace' })
}