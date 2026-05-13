import { Request, Response } from 'express'
import { ZodError } from 'zod'
import {
  createLead,
  deleteLead,
  getLeadById,
  getLeads,
  updateLead,
} from '../data/store'

export const leadController = {
  async getAll(req: Request, res: Response) {
    try {
      const { campaignId, status } = req.query
      const filters: any = {}
      if (campaignId) filters.campaignId = campaignId
      if (status) filters.status = status

      const leads = getLeads(filters)

      res.json({
        success: true,
        data: leads,
        count: leads.length,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar leads',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const lead = getLeadById(id)

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead não encontrado',
        })
      }

      res.json({
        success: true,
        data: lead,
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar lead',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },

  async create(req: Request, res: Response) {
    try {
      const lead = createLead(req.body)

      res.status(201).json({
        success: true,
        data: lead,
        message: 'Lead criado com sucesso',
      })
    } catch (error) {
      if (error instanceof ZodError || (error instanceof Error && error.name === 'ValidationError')) {
        return res.status(400).json({
          success: false,
          message: 'Erro de validação',
          error: error instanceof Error ? error.message : 'Validation failed',
        })
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao criar lead',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const lead = updateLead(id, req.body)

      if (!lead) {
        return res.status(404).json({
          success: false,
          message: 'Lead não encontrado',
        })
      }

      res.json({
        success: true,
        data: lead,
        message: 'Lead atualizado com sucesso',
      })
    } catch (error) {
      if (error instanceof ZodError || (error instanceof Error && error.name === 'ValidationError')) {
        return res.status(400).json({
          success: false,
          message: 'Erro de validação',
          error: error instanceof Error ? error.message : 'Validation failed',
        })
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar lead',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const removed = deleteLead(id)

      if (!removed) {
        return res.status(404).json({
          success: false,
          message: 'Lead não encontrado',
        })
      }

      res.json({
        success: true,
        message: 'Lead excluído com sucesso',
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir lead',
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  },
}
