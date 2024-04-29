interface HeadingProps {
  title: string;
  description: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-black/50">{description}</p>
    </div>
  );
};

export const MiniHeading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-black/50">{description}</p>
    </div>
  );
};