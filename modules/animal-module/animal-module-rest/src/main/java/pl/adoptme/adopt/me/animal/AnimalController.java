package pl.adoptme.adopt.me.animal;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.adoptme.adopt.me.animal.form.AnimalSaveForm;
import pl.adoptme.adopt.me.animal.form.AnimalUpdateForm;
import pl.adoptme.adoptme.adoptme.common.rest.LoggedUser;
import pl.adoptme.adoptme.common.domain.search.SearchForm;
import pl.adoptme.adoptme.common.domain.search.SearchResponse;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/animal")
@RequiredArgsConstructor
class AnimalController {
    private final AnimalService animalService;
    private final LoggedUser loggedUser;
    private final AnimalDtoMapper mapper;


    @GetMapping("/all")
    public List<AnimalDto> getAllAnimal(@RequestBody List<String> animalId) {
        return animalService
                .getAll(animalId, false)
                .stream()
                .map(mapper::mapToAnimalDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{animalId}")
    public AnimalDto getAnimalById(@PathVariable String animalId) {
        return mapper.mapToAnimalDto(animalService.getById(animalId));
    }

    @GetMapping("/type/{typeName}")
    public List<AnimalDto> getAnimalByType(@Valid @PathVariable("typeName") AnimalType type) {
        return animalService.getByType(type).stream()
                .map(mapper::mapToAnimalDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/breed/{breedName}")
    public List<AnimalDto> getAnimalByBreed(@PathVariable("breedName") AnimalBreed breed) {
        return animalService.getByBreed(breed).stream()
                .map(mapper::mapToAnimalDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/color/{colorName}")
    public List<AnimalDto> getAnimalByColor(@PathVariable("colorName") AnimalColor color) {
        return animalService.getByColor(color).stream()
                .map(mapper::mapToAnimalDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/hair/{hairName}")
    public List<AnimalDto> getAnimalByHair(@PathVariable("hairName") AnimalHair hair) {
        return animalService.getByHair(hair).stream()
                .map(mapper::mapToAnimalDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/size/{SizeName}")
    public List<AnimalDto> getAnimalBySize(@PathVariable("sizeName") AnimalSize size) {
        return animalService.getBySize(size).stream()
                .map(mapper::mapToAnimalDto)
                .collect(Collectors.toList());
    }


    @PostMapping
    public AnimalDto savaAnimal(@RequestBody AnimalSaveForm animalSaveForm) {
        return mapper.mapToAnimalDto(animalService.save(animalSaveForm, loggedUser.getLoggedUserId()));
    }

    @PutMapping("/{animalId}")
    public void updateAnimal(
            @RequestBody AnimalUpdateForm animalUpdateForm,
            @PathVariable String animalId) {
        animalService.update(animalUpdateForm, animalId, loggedUser.getLoggedUserId());
    }

    @DeleteMapping("/{animalId}")
    public void deleteAnimal(@PathVariable String animalId) {
        animalService.delete(animalId, loggedUser.getLoggedUserId());
    }

    @PostMapping("search")
    public SearchResponse<AnimalDto> search(@RequestBody SearchForm form) {
        return animalService.search(form).map(mapper::mapToAnimalDto);
    }

}

