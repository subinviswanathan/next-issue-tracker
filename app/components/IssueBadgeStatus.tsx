import { Badge } from '@radix-ui/themes';
import { Status } from '../generated/prisma/enums';

interface Props {
	status: Status;
}

const statusMap: Record<
	Status,
	{ label: string; color: 'violet' | 'green' | 'red' | 'yellow' }
> = {
	OPEN: { label: 'Open', color: 'red' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'green' },
};

const IssueBadgeStatus = ({ status }: Props) => {
	return (
		<Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
	);
};

export default IssueBadgeStatus;
