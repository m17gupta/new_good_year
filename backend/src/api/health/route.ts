import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "medusa-backend"
  })
}
