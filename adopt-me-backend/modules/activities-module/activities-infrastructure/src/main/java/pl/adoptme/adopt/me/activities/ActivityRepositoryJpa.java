package pl.adoptme.adopt.me.activities;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Repository
interface ActivityRepositoryJpa extends JpaRepository<ActivityEntity, String>, JpaSpecificationExecutor<ActivityEntity> {

    @Query("SELECT type AS activityType, COUNT(type) AS total FROM ActivityEntity " +
            "WHERE type IN (:type) " +
            "AND createdOn BETWEEN :createdOnFrom AND :createdOnTo " +
            "GROUP BY type")
    List<ActivityStatisticItem> activityCount(
            @Param("type") Set<ActivityType> type,
            @Param("createdOnFrom") LocalDateTime createdOnFrom,
            @Param("createdOnTo") LocalDateTime createdOnTo);
}

