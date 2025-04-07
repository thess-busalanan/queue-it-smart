
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQueue } from '@/contexts/QueueContext';
import { Service } from '@/lib/types';
import { Clock, FileText, CreditCard, Laptop, ClipboardList, IdCard, ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onJoinQueue: (serviceId: string) => void;
  userInQueue: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onJoinQueue, userInQueue }) => {
  const getIcon = () => {
    switch (service.icon) {
      case 'file-text': return <FileText className="h-12 w-12 text-queue-primary p-2 bg-blue-50 rounded-lg" />;
      case 'credit-card': return <CreditCard className="h-12 w-12 text-queue-primary p-2 bg-blue-50 rounded-lg" />;
      case 'laptop': return <Laptop className="h-12 w-12 text-queue-primary p-2 bg-blue-50 rounded-lg" />;
      case 'clipboard-list': return <ClipboardList className="h-12 w-12 text-queue-primary p-2 bg-blue-50 rounded-lg" />;
      case 'id-card': return <IdCard className="h-12 w-12 text-queue-primary p-2 bg-blue-50 rounded-lg" />;
      default: return <FileText className="h-12 w-12 text-queue-primary p-2 bg-blue-50 rounded-lg" />;
    }
  };

  return (
    <Card className="service-card h-full flex flex-col border-none shadow-lg overflow-hidden">
      <div className="h-2 bg-queue-primary" />
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          {getIcon()}
          <div>
            <CardTitle className="text-xl">{service.name}</CardTitle>
            <CardDescription className="mt-1">{service.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm font-medium text-queue-primary bg-blue-50 py-2 px-3 rounded-full w-fit">
          <Clock className="h-4 w-4" />
          <span>{service.estimatedTimeMinutes} minutes</span>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          className="w-full group" 
          variant={userInQueue ? "outline" : "default"}
          disabled={userInQueue}
          onClick={() => onJoinQueue(service.id)}
        >
          {userInQueue ? "Already in Queue" : (
            <>
              Join Queue 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
