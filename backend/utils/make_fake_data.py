import json

from faker import Faker

faker = Faker('ru_Ru')

def make_fake_data_json():
    fakedata_to_json = {
        'users.json': make_fake_users(),
        'books.json': make_fake_books(),
        'visitors.json': make_fake_visitors()
    }

    for filename in fakedata_to_json:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(
                fakedata_to_json[filename],
                f,
                ensure_ascii=False,
                indent=4
            )


def make_fake_users(count_users: int=3):
    return [
        {
            'username': faker.name(),
            'password': faker.password(length=8, special_chars=False) 
        }
        for _ in range(count_users)
    ]

def make_fake_visitors(count=10):
    return [
        {
            'name': faker.name(),
            'info': faker.job()
        }
        for _ in range(count)
    ]

def make_fake_books(count=100):
    return [
        {
            'title': faker.sentence(nb_words=2),
            'description':  faker.paragraph(nb_sentences=3, variable_nb_sentences=False)
        }
        for _ in range(count)
    ]



if __name__ == '__main__':
    make_fake_data_json()
