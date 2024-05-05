package pl.adoptme.adopt.me.animal;

import java.util.List;

interface HealthBookletRepository {

    List<HealthBooklet> getAll();
    HealthBooklet getById(String id);
    HealthBooklet save(HealthBooklet healthBooklet);
    List<HealthBooklet> saveAll(List<HealthBooklet> healthBooklets);

}
