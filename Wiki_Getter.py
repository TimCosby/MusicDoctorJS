from urllib.request import urlopen
from bs4 import BeautifulSoup

def get_page(search):
    return urlopen('https://en.wikipedia.org/wiki/' + search).readlines()


def get_art(page):
    for index in range(len(page)):
        temp = page[index].decode('utf-8').find('"og:image" content=')

        if temp != -1:
            return page[index].decode('utf-8')[temp + 19:-3]

    return None


def get_description(page):
    for index in range(len(page)):
        temp = page[index].decode('utf-8').find('<p>')

        if temp != -1:
            return BeautifulSoup(page[index].decode('utf-8')[3:page[index].decode('utf-8').find('</p>')], 'html.parser').text

    return None


def get_name(page):
    for index in range(len(page)):
        temp = page[index].decode('utf-8').find('<title>')

        if temp != -1:
            temp = temp + 4

            while page[index].decode('utf-8').find(' - ', temp + 1) != -1:
                last = temp + 3
                temp = page[index].decode('utf-8').find(' - ', temp + 1)

            return page[index].decode('utf-8')[last:temp]

    return None

if __name__ == '__main__':
    search = input('Enter your search:\n')
    lines = get_page(search)

    print(get_name(lines))
    print(get_art(lines))
    print(get_description(lines))