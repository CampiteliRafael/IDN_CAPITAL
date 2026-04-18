function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-col ${className || ''}`}>{children}</div>;
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className || ''}>{children}</div>;
}

function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex-1 ${className || ''}`}>{children}</div>;
}

function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className || ''}>{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
