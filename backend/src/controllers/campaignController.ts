import { Request, Response } from 'express'
import { ZodError } from 'zod'
import {
  createCampaign,
  deleteCampaign,
  getCampaignById,
  getCampaigns,
  updateCampaign,
} from '../data/store'

export const campaignController = {
  async getAll(req: Request, res: Response) {
    try {
      const { isActive } = req.query
      const activeFilter = isActive === undefined ? undefined : isActive === 'true'
      const campaigns = getCampaigns(activeFilter)

      res.json({
        success: true,
        data: campaigns,
        count: campaigns.length,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar campanhas',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const campaign = getCampaignById(id)

      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: 'Campanha não encontrada',
        })
      }

      res.json({
        success: true,
        data: campaign,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar campanha',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },

  async create(req: Request, res: Response) {
    try {
      const campaign = createCampaign(req.body)

      res.status(201).json({
        success: true,
        data: campaign,
        message: 'Campanha criada com sucesso',
      })
    } catch (error) {
      if (error instanceof ZodError || (error instanceof Error && error.name === 'ValidationError')) {
        return res.status(400).json({
          success: false,
          message: 'Erro de validação',
          error: error instanceof Error ? error.message : 'Validation failed',
        })
      }

      if (error instanceof Error && (error as any).code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Já existe uma campanha com esse nome',
        })
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao criar campanha',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const campaign = updateCampaign(id, req.body)

      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: 'Campanha não encontrada',
        })
      }

      res.json({
        success: true,
        data: campaign,
        message: 'Campanha atualizada com sucesso',
      })
    } catch (error) {
      if (error instanceof ZodError || (error instanceof Error && error.name === 'ValidationError')) {
        return res.status(400).json({
          success: false,
          message: 'Erro de validação',
          error: error instanceof Error ? error.message : 'Validation failed',
        })
      }

      if (error instanceof Error && (error as any).code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Já existe uma campanha com esse nome',
        })
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar campanha',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const removed = deleteCampaign(id)

      if (!removed) {
        return res.status(404).json({
          success: false,
          message: 'Campanha não encontrada',
        })
      }

      res.json({
        success: true,
        message: 'Campanha excluída com sucesso',
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir campanha',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },
}
