
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQueue } from '@/contexts/QueueContext';
import { Service } from '@/lib/types';
import { Clock, FileText, CreditCard, Laptop, ClipboardList, IdCard } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onJoinQueue: (serviceId: string) => void;
  userInQueue: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onJoinQueue, userInQueue }) => {
  const getIcon = () => {
    switch (service.icon) {
      case 'file-text': return <FileText className="h-10 w-10 text-queue-primary" />;
      case 'credit-card': return <CreditCard className="h-10 w-10 text-queue-primary" />;
      case 'laptop': return <Laptop className="h-10 w-10 text-queue-primary" />;
      case 'clipboard-list': return <ClipboardList className="h-10 w-10 text-queue-primary" />;
      case 'id-card': return <IdCard className="h-10 w-10 text-queue-primary" />;
      default: return <FileText className="h-10 w-10 text-queue-primary" />;
    }
  };

  return (
    <Card className="queue-card h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {getIcon()}
          <span>{service.name}</span>
        </CardTitle>
        <CardDescription>{service.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Estimated time: {service.estimatedTimeMinutes} minutes</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={userInQueue ? "outline" : "default"}
          disabled={userInQueue}
          onClick={() => onJoinQueue(service.id)}
        >
          {userInQueue ? "Already in Queue" : "Join Queue"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
