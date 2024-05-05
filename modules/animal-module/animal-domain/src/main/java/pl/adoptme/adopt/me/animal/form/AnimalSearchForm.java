package pl.adoptme.adopt.me.animal.form;

import pl.adoptme.adopt.me.animal.AnimalBreed;
import pl.adoptme.adopt.me.animal.AnimalColor;
import pl.adoptme.adopt.me.animal.AnimalSize;
import pl.adoptme.adopt.me.animal.AnimalType;

import java.util.Set;
public class AnimalSearchForm {
    String name;
    Set<String> tagsIds;
    Set<AnimalType> types;
    Set<AnimalColor> colors;
    Set<AnimalBreed> breeds;
    Set<AnimalSize> sizes;
}
