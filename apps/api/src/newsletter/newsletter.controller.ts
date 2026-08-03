import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { AdminGuard } from '../auth/admin.guard';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  subscribe(@Body() body: { email: string; name?: string }) {
    return this.newsletterService.subscribe(body.email, body.name);
  }

  @Get('subscribers')
  @UseGuards(AdminGuard)
  findAll() {
    return this.newsletterService.findAll();
  }
}