import { AnnouncementService } from './announcement/announcement.service';
import { PrmTopbarAfterConfig } from './announcement/prmTopbarAfter.component';

angular.module('viewCustom')
      .service('announcementService', AnnouncementService)
      .component(PrmTopbarAfterConfig.name, PrmTopbarAfterConfig.config);
