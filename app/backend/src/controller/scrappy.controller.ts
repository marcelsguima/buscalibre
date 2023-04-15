import { Request, Response } from 'express';
import { fetchFromWebOrCache } from '../service/scrappy.service';

export async function fetchPageController(req: Request, res: Response) {
  const url = req.body.url as string;
  if (!url) {
    return res.status(400).json({ message: 'Missing URL parameter' });
  }
  const document = await fetchFromWebOrCache(url);
  if (!document) {
    return res.status(500).json({ message: 'Failed to fetch document' });
  }
  return res.json({ document });
}
