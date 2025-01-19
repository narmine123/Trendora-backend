import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('products')
  export class Product {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 255 })
    title: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
  
    @Column('text')
    description: string;
  
    @Column({ length: 100 })
    category: string;
  
    @Column({ length: 255 })
    image: string;
  
  
    @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
    ratingRate: number;
  
    @Column({ type: 'int', nullable: true })
    ratingCount: number;
  
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  }
  