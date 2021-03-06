package com.maxclay.dao;

import com.maxclay.model.DataSetVersion;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author Vlad Glinskiy
 */
public interface DataSetVersionDao extends MongoRepository<DataSetVersion, String>, DataSetVersionOperations {
}
