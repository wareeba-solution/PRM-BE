import { User } from '../../users/entities/user.entity';
import { Organization } from '../../organizations/entities/organization.entity';
export declare class PushSubscription {
    id: string;
    userId: string;
    user: User;
    organizationId: string;
    organization: Organization;
    /**
     * The stringified push subscription object from the browser
     * Contains endpoint, keys (p256dh, auth), etc.
     */
    subscription: string;
    /**
     * The unique endpoint URL for this subscription
     * Used for querying and updating subscriptions
     */
    endpoint: string;
    /**
     * User agent information of the device/browser
     */
    userAgent: string;
    /**
     * Whether this subscription is currently active
     */
    active: boolean;
    /**
     * Last time a notification was successfully sent to this subscription
     */
    lastUsed: Date;
    /**
     * Creation timestamp
     */
    createdAt: Date;
    /**
     * Last update timestamp
     */
    updatedAt: Date;
}
