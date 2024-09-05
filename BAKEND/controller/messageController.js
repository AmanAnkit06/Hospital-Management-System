import { Message } from "../models/messageSchema.js";
import { catchAsyncerrors } from "../middlewares/catchAsyncErrors.js";
import ErroHandler from "../middlewares/errorMiddlewares.js";

export const sendMessage = catchAsyncerrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErroHandler("Please Fill Full Form!", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message Send Successfully",
  });
});
