#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include<stdlib.h>	// exit, malloc 등 standard library 헤더
#include<string.h>	// 문자열 처리 헤더

struct node {
	struct node* no;		// "아니오"에 대응하는 노드를 참조
	struct node* yes;		// "예"에 대응하는 노드를 참조
	char string[1];			// 질문이나 동물 이름
};

struct node* make_node(char* string)
{
	struct node* memory;		// 새로 할당한 메모리를 가리킬 포인터

	if ((memory = (struct node*)malloc(sizeof(struct node) + strlen(string))) == (struct node*)0)
	{
		(void)fprintf(stderr, "gta: out of memory. \n");
		exit(-1);
	}

	(void)strcpy(memory->string, string);
	memory->yes = memory->no = (struct node*)0;

	return memory;
}

int main(int argc, char* argv[])
{
	char					animal[50];
	char					buffer[3];
	int						c;
	struct node** current;
	FILE* in;
	struct node* new;
	FILE* out;
	char* p;
	char					question[100];
	struct node* root;

	// 명령줄 인자를 처리한다.

	in = out = (FILE*)0;

	for (argc--, argv++; argc > 1 && argc % 2 == 0; argc -= 2, argv += 2) {
		if (strcmp(argv[0], "-i") == 0 && in == (FILE*)0) {
			if ((in = fopen(argv[1], "r")) == (FILE*)0) {
				(void)fprintf(stderr, "gta : can't open input file `%s'.\n", argv[1]);
				exit(-1);
			}
		}
		else if (strcmp(argv[0], "-o") == 0 && out == (FILE*)0) {
			if ((out = fopen(argv[1], "w")) == (FILE*)0) {
				(void)fprintf(stderr, "gta : can't open output file `%s'.\n", argv[1]);
				exit(-1);
			}
		}
		else
			break;
	}

	if (argc > 0) {
		(void)fprintf(stderr, "usage: gta [-i input-file-name] [-o output-file-name]\n");
		exit(-1);
	}

	// 명령줄에서 입력 파일을 지정하지 않으면 표준 입력에서 입력을 읽는다.

	if (in == (FILE*)0)
		in = stdin;

	// 초기 트리를 만든다.

	root = make_node("Does it bark");	// 동물이 짖습니까?
	root->yes = make_node("dog");			// 개
	root->no = make_node("cat");			// 고양이

	for (;;) {
		// 사용자 종료시 까지 무한 루프

		if (in == stdin)
			(void)printf("Think of an animal.\n");		// 동물을 생각해보세요.

		current = &root;

		for (;;) {
			// 게임을 플레이한다
			for (;;) {
				// 올바른 사용자 입력을 받는다
				if (in == stdin) {
					if ((*current)->yes == (struct node*)0)
						(void)printf("Is it a ");		// ~입니까.
					(void)printf("%s[ynq] ", (*current)->string);
				}

				if (fgets(buffer, sizeof(buffer), in) == (char*)0 || strcmp(buffer, "q\n") == 0) {
					if (in != stdin) {
						(void)fclose(in);
						in = stdin;
					}
					else {
						if (in == stdin)
							(void)printf("\nThanks for plating. Bye. \n");
						exit(0);
					}
				}
				else if (strcmp(buffer, "y\n") == 0) {
					if (out != (FILE*)0)
						fputs("y\n", out);

					current = &((*current)->yes);

					if (*current == (struct node*)0) {
						(void)printf("I knew it!\n");
						break;
					}
				}
				else if (strcmp(buffer, "n\n") == 0) {
					if (out != (FILE*)0)
						fputs("n\n", out);

					if ((*current)->no == (struct node*)0) {
						if (in == stdin)
							(void)printf("I give up. What is it? ");

						fgets(animal, sizeof(animal), in);

						if (out != (FILE*)0)
							fputs(animal, out);

						if ((p = strchr(animal, '\n')) != (char*)0)
							*p = '\0';

						if (in == stdin)
							(void)printf("What's a good question that I could use to tell a %s from a %s?",
								animal, (*current)->string);
						fgets(question, sizeof(question), in);	// 새로운 질문을 입력

						if (out != (FILE*)0) {
							fputs(question, out);

							if ((p = strchr(question, '\n')) != (char*)0)
								*p = '\0';

							new = make_node(question);
							new->yes = make_node(animal);
							new->no = *current;
							*current = new;

							if (in == stdin)
								(void)printf("Thanks! I'll remember that.\n");

							break;
						}
					}
					else
						current = &((*current)->no);
				}
				else {
					if (in == stdin)		// y, n, q 중 하나만 받아들이기
						(void)printf("Huh? Please answer y for yes, n for no, or q for quit. \n");

					while ((c = getc(in)) != '\n' && c != EOF);
				}
			}
			break;
		}
		if (in == stdin)
			(void)printf("Let's play again.\n\n");
	}
}

