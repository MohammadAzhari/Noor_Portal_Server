export const server500Error = (
  res,
  message = 'Something Wrong! , server error'
) => res.status(500).send(message);
