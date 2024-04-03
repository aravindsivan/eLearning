import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from "cloudinary";
import LayoutModel from "../models/layout.model";

// Create layout -- admin only
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist = await LayoutModel.findOne({ type });

      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exists`, 400));
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.create({ type, banner });
      }
      if (type === "FAQ") {
        const { faq } = req.body;
        await LayoutModel.create({ type, faq });
      }
      if (type === "Categories") {
        const { categories } = req.body;
        await LayoutModel.create({ type, categories });
      }

      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit layout -- admin only
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
        if (bannerData) {
          await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        }
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await LayoutModel.findByIdAndUpdate(bannerData._id, { banner });
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqData: any = await LayoutModel.findOne({ type: "FAQ" });
        await LayoutModel.findByIdAndUpdate(faqData._id, { faq });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesData: any = await LayoutModel.findOne({
          type: "Categories",
        });
        await LayoutModel.findByIdAndUpdate(categoriesData._id, { categories });
      }

      res.status(201).json({
        success: true,
        message: "Layout updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get layout by type
export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const type = req.body.type;
      if (!type) {
        return next(new ErrorHandler("Type not found", 404));
      }

      const layout = await LayoutModel.findOne({ type });

      res.status(201).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
