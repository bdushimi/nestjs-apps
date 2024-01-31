import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET'),
    {
      apiVersion: '2023-10-16',
    },
  );
  constructor(private readonly configService: ConfigService) {}
}
