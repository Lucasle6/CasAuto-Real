import { Controller, Get, Post, Body } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  subscribe(@Body() body: { email: string; name?: string }) {
    return this.newsletterService.subscribe(body.email, body.name);
  }

  @Get('subscribers')
  findAll() {
    return this.newsletterService.findAll();
  }
}